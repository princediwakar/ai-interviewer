// utils/exportUtils.ts
import type { InterviewRound, QuestionState } from '../types/interview';
import { jsPDF } from 'jspdf';

export interface ExportData {
  jobDescription: string;
  backgroundInfo: string;
  interviewRounds: InterviewRound[];
  questionStates: QuestionState[];
  exportDate: string;
}

export function generateMarkdownExport(data: ExportData): string {
  const { jobDescription, backgroundInfo, interviewRounds, questionStates, exportDate } = data;
  
  let markdown = `# Interview Preparation Export\n\n`;
  markdown += `**Generated on:** ${exportDate}\n\n`;
  
  // Job Information
  markdown += `## Job Description\n\n`;
  markdown += `${jobDescription}\n\n`;
  
  if (backgroundInfo) {
    markdown += `## Your Background\n\n`;
    markdown += `${backgroundInfo}\n\n`;
  }
  
  // Interview Questions
  markdown += `## Interview Questions\n\n`;
  
  interviewRounds.forEach((round, roundIndex) => {
    const startIndex = interviewRounds.slice(0, roundIndex).reduce((acc, r) => acc + r.questions.length, 0);
    
    markdown += `### Round ${roundIndex + 1}: ${round.name}\n\n`;
    markdown += `*${round.description}*\n\n`;
    
    round.questions.forEach((question, qIndex) => {
      const globalIndex = startIndex + qIndex;
      const state = questionStates[globalIndex];
      
      markdown += `#### Question ${qIndex + 1}\n\n`;
      markdown += `**Q:** ${question.text}\n\n`;
      
      if (question.personalized) {
        markdown += `*🎯 Personalized question*\n\n`;
      }
      
      if (state?.guidance) {
        markdown += `**💡 Answer Tips:**\n${state.guidance}\n\n`;
      }
      
      if (state?.fullAnswer) {
        markdown += `**📝 Sample Answer:**\n${state.fullAnswer}\n\n`;
      }
      
      markdown += `---\n\n`;
    });
  });
  
  return markdown;
}

export function downloadMarkdown(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generatePrintableHTML(data: ExportData): string {
  const { interviewRounds, questionStates, exportDate } = data;
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Interview Questions - ${exportDate}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        .header { 
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .section { 
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .round { 
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            background: #f9fafb;
        }
        .question { 
            border-left: 4px solid #3b82f6;
            padding-left: 16px;
            margin: 16px 0;
        }
        .guidance { 
            background: #dbeafe;
            padding: 12px;
            border-radius: 6px;
            margin: 8px 0;
        }
        .answer { 
            background: #d1fae5;
            padding: 12px;
            border-radius: 6px;
            margin: 8px 0;
        }
        .personalized { 
            color: #3b82f6;
            font-weight: 600;
            font-size: 12px;
        }
        h1 { color: #1f2937; }
        h2 { color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
        h3 { color: #4b5563; }
        @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Interview Questions</h1>
        <p><strong>Generated on:</strong> ${exportDate}</p>
    </div>
    
    <div class="section">
        <h2>Interview Questions & Answers</h2>
        ${interviewRounds.map((round, roundIndex) => {
          const startIndex = interviewRounds.slice(0, roundIndex).reduce((acc, r) => acc + r.questions.length, 0);
          return `
            <div class="round">
                <h3>Round ${roundIndex + 1}: ${round.name}</h3>
                <p><em>${round.description}</em></p>
                
                ${round.questions.map((question, qIndex) => {
                  const globalIndex = startIndex + qIndex;
                  const state = questionStates[globalIndex];
                  
                  return `
                    <div class="question">
                        <h4>Question ${qIndex + 1}</h4>
                        <p><strong>${question.text}</strong></p>
                        ${question.personalized ? '<p class="personalized">🎯 Personalized question</p>' : ''}
                        
                        ${state?.guidance ? `
                        <div class="guidance">
                            <strong>💡 Answer Tips:</strong>
                            <p>${state.guidance}</p>
                        </div>
                        ` : ''}
                        
                        ${state?.fullAnswer ? `
                        <div class="answer">
                            <strong>📝 Sample Answer:</strong>
                            <p style="white-space: pre-wrap;">${state.fullAnswer}</p>
                        </div>
                        ` : ''}
                    </div>
                  `;
                }).join('')}
            </div>
          `;
        }).join('')}
    </div>
</body>
</html>
  `.trim();
}

export function generatePDF(data: ExportData): void {
  const { interviewRounds, questionStates, exportDate } = data;
  
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;
  
  // Title
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('Interview Questions', margin, yPosition);
  yPosition += 10;
  
  // Date
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text(`Generated on: ${exportDate}`, margin, yPosition);
  yPosition += 20;
  
  // Process each round
  interviewRounds.forEach((round, roundIndex) => {
    const startIndex = interviewRounds.slice(0, roundIndex).reduce((acc, r) => acc + r.questions.length, 0);
    
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Round title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    const roundTitle = `Round ${roundIndex + 1}: ${round.name}`;
    doc.text(roundTitle, margin, yPosition);
    yPosition += 8;
    
    // Round description
    doc.setFontSize(10);
    doc.setFont(undefined, 'italic');
    const descriptionLines = doc.splitTextToSize(round.description, maxWidth);
    doc.text(descriptionLines, margin, yPosition);
    yPosition += descriptionLines.length * 5 + 10;
    
    // Questions
    round.questions.forEach((question, qIndex) => {
      const globalIndex = startIndex + qIndex;
      const state = questionStates[globalIndex];
      
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = margin;
      }
      
      // Question number and text
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`Question ${qIndex + 1}`, margin, yPosition);
      yPosition += 8;
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      const questionLines = doc.splitTextToSize(question.text, maxWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 5 + 5;
      
      // Tips if available
      if (state?.guidance) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('💡 Tips:', margin, yPosition);
        yPosition += 5;
        
        doc.setFont(undefined, 'normal');
        const tipsLines = doc.splitTextToSize(state.guidance, maxWidth);
        doc.text(tipsLines, margin, yPosition);
        yPosition += tipsLines.length * 4 + 5;
      }
      
      // Sample answer if available
      if (state?.fullAnswer) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('📝 Sample Answer:', margin, yPosition);
        yPosition += 5;
        
        doc.setFont(undefined, 'normal');
        const answerLines = doc.splitTextToSize(state.fullAnswer, maxWidth);
        doc.text(answerLines, margin, yPosition);
        yPosition += answerLines.length * 4 + 10;
      }
      
      yPosition += 5; // Space between questions
    });
    
    yPosition += 10; // Space between rounds
  });
  
  // Generate filename
  const filename = `interview-questions-${new Date().toISOString().split('T')[0]}.pdf`;
  
  // Download the PDF
  doc.save(filename);
}

export function printHTML(htmlContent: string) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to fully load before printing
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Don't auto-close so user can save as PDF
      }, 500);
    };
    
    // Fallback timeout in case onload doesn't fire
    setTimeout(() => {
      printWindow.print();
    }, 1000);
  }
}

export function generateSessionURL(data: ExportData): string {
  const compressed = JSON.stringify({
    j: data.jobDescription,
    b: data.backgroundInfo,
    t: Date.now()
  });
  const encoded = btoa(compressed);
  return `${window.location.origin}${window.location.pathname}?session=${encodeURIComponent(encoded)}`;
}