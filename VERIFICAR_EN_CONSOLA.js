// 🔍 SCRIPT DE VERIFICACIÓN - Copia y pega esto en la consola (F12)

console.log('%c📋 VERIFICADOR DE CREDENCIALES - NOMADA', 'color: blue; font-size: 16px; font-weight: bold;');
console.log('%c═════════════════════════════════════════════', 'color: blue;');

// Función para probar credenciales
async function probarCredenciales(email, password) {
  try {
    console.log(`\n🔐 Probando: ${email} / ${password}`);
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ÉXITO! Token: ${data.token.substring(0, 20)}...`);
      console.log(`   Rol: ${data.user.role}`);
      return true;
    } else {
      console.log(`❌ FALLÓ - Credenciales inválidas`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return false;
  }
}

// Función para verificar servidor
async function verificarServidor() {
  try {
    console.log('\n🌐 Verificando servidor...');
    const response = await fetch('http://localhost:8080/api/health');
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Servidor en línea: ${JSON.stringify(data)}`);
      return true;
    } else {
      console.log('❌ Servidor no responde correctamente');
      return false;
    }
  } catch (error) {
    console.log(`❌ Servidor NO está en línea: ${error.message}`);
    return false;
  }
}

// Ejecutar verificaciones
(async function() {
  console.log('\n📊 INICIANDO PRUEBAS...\n');
  
  // Verificar servidor
  const servidorOk = await verificarServidor();
  
  if (servidorOk) {
    // Probar credenciales
    console.log('\n%c🔑 PROBANDO CREDENCIALES DISPONIBLES', 'color: green; font-weight: bold;');
    
    const credenciales = [
      { email: 'carlos.perez@travelagency.com', password: '1234' },
      { email: 'ana.sanchez@travelagency.com', password: '1234' },
      { email: 'admin@travel.io', password: 'admin123' },
      { email: 'marta@travel.io', password: 'user123' }
    ];
    
    for (const cred of credenciales) {
      await probarCredenciales(cred.email, cred.password);
    }
  }
  
  console.log('\n%c═════════════════════════════════════════════', 'color: blue;');
  console.log('%c✅ VERIFICACIÓN COMPLETADA', 'color: green; font-size: 14px; font-weight: bold;');
})();
