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

  // Configurar console personalizado para reduzir spam
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Filtrar mensagens específicas
    const shouldSilence = [
      'FullStory namespace conflict',
      'LaunchDarkly',
      'chunk loading',
      'ERR_BLOCKED_BY_CLIENT'
    ].some(pattern => message.includes(pattern));
    
    if (!shouldSilence) {
      originalConsoleError.apply(console, args);
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
