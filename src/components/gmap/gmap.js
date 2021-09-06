const initMap = function() {
  const map = new window.google.maps.Map(document.getElementById('gmap'), {
    center: { lat: 6.443465303274183, lng: 3.4154240653889745 },
    zoom: 14,
    disableDefaultUI: true,
  });

  const info = `<ul class='contact'>
                  <li class='contact--item contact--address'>13 Sawyer Crescent Victoria Island Lagos Nigeria</li>
                  <li class='contact--item contact--phone'>(+234) 137632128</li> 
                  <li class='contact--item contact--email'>support@coinbase.com</li> 
                </ul>`;

  const infowindow = new window.google.maps.InfoWindow({
    content: info,
    maxWidth: 330,
    minWidth: 230,
    disableAutoPan: false,
  });

  const marker = new window.google.maps.Marker({
    position: { lat: 6.4327552146545415, lng: 3.414558900283119 },
    map: map,
    icon: require('Images/icon/marker.svg').default, // eslint-disable-line global-require
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });

  class USGSOverlay extends window.google.maps.OverlayView {
    // constructor() {
    //   super();
    // }

    onAdd() {
      this.div = document.createElement('div');
      this.div.className = 'gmap-overlay';
      const panes = this.getPanes();
      panes.overlayLayer.appendChild(this.div);
    }
  }

  const overlay = new USGSOverlay();
  overlay.setMap(map);
};

export default initMap;
