// Sistema de tratamento de erros global
export function setupGlobalErrorHandling() {
  // Capturar erros não tratados
  window.addEventListener('error', (event) => {
    console.warn('Global error captured:', event.error);
    
    // Ignorar erros específicos conhecidos
    const ignoredErrors = [
      'IFrame evaluation timeout',
      'LaunchDarkly',
      'FullStory',
      'Script error',
      'Non-Error promise rejection captured'
    ];
    
    const shouldIgnore = ignoredErrors.some(ignored => 
      event.error?.message?.includes(ignored) || 
      event.filename?.includes(ignored)
    );
    
    if (shouldIgnore) {
      event.preventDefault();
      return false;
    }
  });

  // Capturar promises rejeitadas
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    
    // Ignorar timeouts conhecidos
    if (event.reason?.message?.includes('timeout') || 
        event.reason?.message?.includes('IFrame evaluation')) {
      event.preventDefault();
      return false;
    }
  });

  // Enhanced console filtering for FullStory and other known issues
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = (...args) => {
    const message = args.join(' ');

    // More comprehensive filtering
    const shouldSilence = [
      'FullStory namespace conflict',
      'FullStory',
      '_fs_namespace',
      'LaunchDarkly',
      'chunk loading',
      'ERR_BLOCKED_BY_CLIENT',
      'IFrame evaluation timeout',
      'Script error'
    ].some(pattern => message.toLowerCase().includes(pattern.toLowerCase()));

    if (!shouldSilence) {
      originalConsoleError.apply(console, args);
    }
  };

  console.warn = (...args) => {
    const message = args.join(' ');

    const shouldSilence = [
      'FullStory namespace conflict',
      'FullStory',
      '_fs_namespace'
    ].some(pattern => message.toLowerCase().includes(pattern.toLowerCase()));

    if (!shouldSilence) {
      originalConsoleWarn.apply(console, args);
    }
  };
}

// Configurar fetch com timeouts padrão
export function setupFetchWithTimeout() {
  if (typeof window !== 'undefined' && window.fetch) {
    const originalFetch = window.fetch;
    
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
      
      const fetchOptions: RequestInit = {
        ...init,
        signal: controller.signal
      };
      
      return originalFetch(input, fetchOptions)
        .finally(() => clearTimeout(timeoutId))
        .catch(error => {
          if (error.name === 'AbortError') {
            throw new Error('Request timeout');
          }
          throw error;
        });
    };
  }
}

// Função para reportar erros de forma silenciosa
export function silentErrorReport(error: any, context: string) {
  console.warn(`[${context}] Silent error:`, error);
  
  // Aqui você pode adicionar integração com serviços de monitoramento
  // como Sentry, LogRocket, etc.
}
