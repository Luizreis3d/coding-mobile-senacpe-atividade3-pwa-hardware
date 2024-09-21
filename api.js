document.addEventListener('DOMContentLoaded', function() {
    // Geolocalização
    const status = document.getElementById('status');
    const lugares = document.getElementById('lugares');
  
    function obterLocalizacao() {
      if (!navigator.geolocation) {
        status.textContent = 'Geolocalização não suportada no seu navegador.';
      } else {
        status.textContent = 'Obtendo localização...';
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      status.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
  
      // Simular pontos turísticos próximos com base na localização
      const pontosTuristicos = [
        { nome: "Museu de Arte", lat: latitude + 0.001, long: longitude + 0.001 },
        { nome: "Praça Central", lat: latitude + 0.002, long: longitude + 0.002 }
      ];
  
      pontosTuristicos.forEach(ponto => {
        const item = document.createElement('li');
        item.textContent = `${ponto.nome} - Localizado próximo de você.`;
        lugares.appendChild(item);
      });
    }
  
    function error() {
      status.textContent = 'Não foi possível obter sua localização.';
    }
  
    obterLocalizacao();
  
    // Câmera
    const cameraButton = document.getElementById('capturarFoto');
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const tirarFotoButton = document.getElementById('tirarFoto');
  
    cameraButton.addEventListener('click', () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          tirarFotoButton.hidden = false;
        })
        .catch(err => {
          console.error("Erro ao acessar a câmera: ", err);
        });
    });
  
    tirarFotoButton.addEventListener('click', () => {
      const contexto = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
    });
  });
  