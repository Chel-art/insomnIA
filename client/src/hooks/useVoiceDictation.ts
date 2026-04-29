import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useVoiceDictation({ onResult }: { onResult: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false; // Parar cuando el usuario deje de hablar
    rec.interimResults = false; // Solo resultados finales
    rec.lang = 'es-ES';

    rec.onstart = () => {
      setIsListening(true);
      toast.info('Escuchando...', { description: 'Cuéntale tu sueño a Morfeo.' });
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    rec.onerror = (event: any) => {
      console.error('Error de reconocimiento de voz:', event.error);
      setIsListening(false);
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        toast.error('Error de micrófono', { description: 'Revisa los permisos de tu navegador.' });
      }
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onResult]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  }, [isListening]);

  return { isListening, isSupported, toggleListening };
}
