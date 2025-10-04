// utils/apiService.ts

export interface ApiError extends Error {
  status?: number;
  code?: string;
  retryable?: boolean;
}

export class ApiService {
  private static createError(message: string, status?: number, retryable = false): ApiError {
    const error = new Error(message) as ApiError;
    error.status = status;
    error.retryable = retryable;
    return error;
  }

  private static async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const isServerError = response.status >= 500;
      const isRetryable = isServerError || response.status === 429;
      
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If we can't parse error response, use default message
      }

      throw this.createError(errorMessage, response.status, isRetryable);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    
    return response;
  }

  static async generateQuestions(
    jobDescription: string, 
    backgroundInfo?: string,
    onProgress?: (content: string) => void
  ): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: jobDescription.trim(),
          backgroundInfo: backgroundInfo?.trim() || undefined
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw this.createError(
          `Failed to generate questions: ${response.status} ${response.statusText}`,
          response.status,
          response.status >= 500
        );
      }

      return { response, controller };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw this.createError('Request timeout - please try again', 408, true);
        }
        if (error.message.includes('Failed to fetch')) {
          throw this.createError('Network error - check your connection', 0, true);
        }
      }
      
      throw error;
    }
  }

  static async getGuidance(
    question: string,
    jobDescription: string,
    backgroundInfo: string
  ): Promise<{ guidance: string }> {
    if (!question || !jobDescription || !backgroundInfo) {
      throw this.createError('Missing required parameters for guidance', 400, false);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch('/api/guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          jobDescription,
          backgroundInfo,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError('Request timeout - please try again', 408, true);
      }
      
      throw error;
    }
  }

  static async getFullAnswer(
    question: string,
    jobDescription: string,
    backgroundInfo: string
  ): Promise<{ answer: string }> {
    if (!question || !jobDescription || !backgroundInfo) {
      throw this.createError('Missing required parameters for full answer', 400, false);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch('/api/full-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          jobDescription,
          backgroundInfo,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError('Request timeout - please try again', 408, true);
      }
      
      throw error;
    }
  }

  static isRetryableError(error: Error): boolean {
    const apiError = error as ApiError;
    return apiError.retryable === true;
  }
}