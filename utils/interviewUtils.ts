// utils/interviewUtils.ts
// This function is now deprecated since we render UI components directly during streaming
export const convertJsonToMarkdown = (content: string): string => {
  // For backward compatibility, just return the content
  return content;
};
  
  export const parseMarkdownToHtml = (markdown: string) => {
    let roundQuestionCount = 0;
    return markdown.split('\n').map(line => {
      if (line.startsWith('## ')) {
        roundQuestionCount = 0;
        const num = line.match(/## (\d+)/)?.[1] || '';
        const headerText = line.replace(/## \d+\. /, '').trim();
        return `<div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50"><div class="flex items-center space-x-3"><span class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">${num}</span><div class="flex-1 min-w-0"><h3 class="font-semibold text-gray-900 text-base truncate">${headerText.split('\n')[0]}</h3><p class="text-gray-600 text-xs mt-1 line-clamp-2">${headerText.split('\n').slice(1).join(' ')}</p></div></div></div>`;
      } else if (line.startsWith('*') && line.endsWith('*')) {
        return `<p class="text-gray-600 text-sm mb-3 italic px-3 py-1">${line.slice(1, -1)}</p>`;
      } else if (line.startsWith('**') && line.includes('**')) {
        roundQuestionCount++;
        const num = line.match(/\*\*(\d+)\.\*\*/)?.[1] || '';
        const qText = line.replace(/\*\*\d+\.\*\* /, '').trim();
        return `<div class="p-3 bg-white"><div class="flex items-start space-x-3"><span class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-semibold mt-0.5 flex-shrink-0">${num}</span><p class="text-gray-800 leading-relaxed text-sm flex-1 min-w-0">${qText}</p></div></div>`;
      } else if (line === '---') {
        return '<hr class="my-4 border-gray-200 mx-3">';
      } else if (line.trim()) {
        return `<p class="mb-1 px-3 text-sm">${line}</p>`;
      }
      return '';
    }).join('');
  };