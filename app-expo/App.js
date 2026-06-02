import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { DeviceMotion } from 'expo-sensors';
import { StatusBar } from 'expo-status-bar';

/**
 * CS2 Weapons - Wrapper Expo (minimo)
 *
 * Unica responsabilidad: detectar shake nativo con DeviceMotion
 * y notificar al WebView via postMessage({shake:true}).
 *
 * No maneja audio, no conoce armas, no tiene estado de sonido.
 * SvelteKit se encarga de todo lo demas.
 */

const SVELTEKIT_URL = 'http://192.168.1.231:5173';
const SHAKE_THRESHOLD = 10;
const COOLDOWN_MS = 2000;

export default function App() {
  const webViewRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastShake = useRef(0);

  useEffect(() => {
    let sub;
    DeviceMotion.setUpdateInterval(100);
    sub = DeviceMotion.addListener(({ rotationRate }) => {
      if (!rotationRate) return;
      const { alpha, beta, gamma } = rotationRate;
      const m = Math.sqrt((alpha ?? 0) ** 2 + (beta ?? 0) ** 2 + (gamma ?? 0) ** 2);
      const now = Date.now();
      if (m > SHAKE_THRESHOLD && now - lastShake.current > COOLDOWN_MS) {
        lastShake.current = now;
        webViewRef.current?.postMessage(JSON.stringify({ shake: true }));
      }
    });
    return () => sub?.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {!isLoaded && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Cargando CS2 Weapons...</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: SVELTEKIT_URL }}
        style={styles.webview}
        onLoad={() => setIsLoaded(true)}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1117' },
  webview: { flex: 1 },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f1117',
    zIndex: 10,
  },
  loadingText: { color: '#e8eaf0', fontSize: 18, fontWeight: '700' },
});
