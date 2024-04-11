
require('DateExt');
const Layout = require('Layout');

// api documentation: https://aa.usno.navy.mil/data/api
const dataCache = {

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=44.22568,-76.48151&height=74
    "     Kingston-Battery     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-76.48151,44.22568],"height":"74m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 24m 54.9s","duration_of_totality":"3m 05.8s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"51.0","azimuth":"204.8","day":"8","phenomenon":"Eclipse Begins","position_angle":"231.9","time":"18:09:28.8","vertex_angle":"214.4"},{"altitude":"43.1","azimuth":"228.8","day":"8","phenomenon":"Totality Begins","position_angle":"21.3","time":"19:22:09.9","vertex_angle":"348.5"},{"altitude":"42.9","azimuth":"229.3","day":"8","phenomenon":"Maximum Eclipse","time":"19:23:42.0"},{"altitude":"42.7","azimuth":"229.7","day":"8","phenomenon":"Totality Ends","position_angle":"267.1","time":"19:25:15.7","vertex_angle":"233.8"},{"altitude":"32.2","azimuth":"246.8","day":"8","phenomenon":"Eclipse Ends","position_angle":"56.7","time":"20:34:23.7","vertex_angle":"15.1"}],"magnitude":"1.012","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=45.04211,-74.74341&height=60
    "     Cornwall-ViaRail     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-74.74341,45.04211],"height":"60m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 23m 21.6s","duration_of_totality":"2m 08.1s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"49.4","azimuth":"208.1","day":"8","phenomenon":"Eclipse Begins","position_angle":"232.1","time":"18:12:30.3","vertex_angle":"212.7"},{"altitude":"41.3","azimuth":"231.0","day":"8","phenomenon":"Totality Begins","position_angle":"1.0","time":"19:24:57.6","vertex_angle":"327.5"},{"altitude":"41.1","azimuth":"231.3","day":"8","phenomenon":"Maximum Eclipse","time":"19:26:00.8"},{"altitude":"41.0","azimuth":"231.6","day":"8","phenomenon":"Totality Ends","position_angle":"288.6","time":"19:27:05.7","vertex_angle":"254.8"},{"altitude":"30.5","azimuth":"248.2","day":"8","phenomenon":"Eclipse Ends","position_angle":"57.6","time":"20:35:51.9","vertex_angle":"16.2"}],"magnitude":"1.005","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=45.01411,-74.72634&height=52
    "     Cornwall-Lamoureux     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-74.72634,45.01411],"height":"52m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 23m 22.7s","duration_of_totality":"2m 18.6s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"49.5","azimuth":"208.1","day":"8","phenomenon":"Eclipse Begins","position_angle":"232.1","time":"18:12:30.4","vertex_angle":"212.7"},{"altitude":"41.3","azimuth":"231.0","day":"8","phenomenon":"Totality Begins","position_angle":"4.5","time":"19:24:53.1","vertex_angle":"331.0"},{"altitude":"41.1","azimuth":"231.3","day":"8","phenomenon":"Maximum Eclipse","time":"19:26:01.6"},{"altitude":"41.0","azimuth":"231.6","day":"8","phenomenon":"Totality Ends","position_angle":"285.1","time":"19:27:11.7","vertex_angle":"251.2"},{"altitude":"30.5","azimuth":"248.2","day":"8","phenomenon":"Eclipse Ends","position_angle":"57.5","time":"20:35:53.1","vertex_angle":"16.1"}],"magnitude":"1.006","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=44.59221,-75.69288&height=85
    "     Brockville-ViaRail     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-75.69288,44.59221],"height":"85m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 24m 13.0s","duration_of_totality":"2m 46.3s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"50.3","azimuth":"206.3","day":"8","phenomenon":"Eclipse Begins","position_angle":"232.0","time":"18:10:52.0","vertex_angle":"213.6"},{"altitude":"42.3","azimuth":"229.8","day":"8","phenomenon":"Totality Begins","position_angle":"13.9","time":"19:23:23.8","vertex_angle":"340.7"},{"altitude":"42.1","azimuth":"230.2","day":"8","phenomenon":"Maximum Eclipse","time":"19:24:46.2"},{"altitude":"41.9","azimuth":"230.6","day":"8","phenomenon":"Totality Ends","position_angle":"275.1","time":"19:26:10.2","vertex_angle":"241.5"},{"altitude":"31.4","azimuth":"247.4","day":"8","phenomenon":"Eclipse Ends","position_angle":"57.0","time":"20:35:05.0","vertex_angle":"15.5"}],"magnitude":"1.009","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=44.58626,-75.68507&height=85
    "     Brockville-Hardy     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-75.68507,44.58626],"height":"85m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 24m 13.1s","duration_of_totality":"2m 48.2s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"50.3","azimuth":"206.3","day":"8","phenomenon":"Eclipse Begins","position_angle":"232.0","time":"18:10:52.4","vertex_angle":"213.6"},{"altitude":"42.3","azimuth":"229.8","day":"8","phenomenon":"Totality Begins","position_angle":"14.6","time":"19:23:23.4","vertex_angle":"341.4"},{"altitude":"42.1","azimuth":"230.2","day":"8","phenomenon":"Maximum Eclipse","time":"19:24:46.7"},{"altitude":"41.9","azimuth":"230.6","day":"8","phenomenon":"Totality Ends","position_angle":"274.4","time":"19:26:11.5","vertex_angle":"240.8"},{"altitude":"31.4","azimuth":"247.5","day":"8","phenomenon":"Eclipse Ends","position_angle":"57.0","time":"20:35:05.5","vertex_angle":"15.5"}],"magnitude":"1.009","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=44.17968,-77.37413&height=91
    "     Belleville-ViaRail     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-77.37413,44.17968],"height":"91m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 25m 21.0s","duration_of_totality":"1m 58.6s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"51.3","azimuth":"203.0","day":"8","phenomenon":"Eclipse Begins","position_angle":"231.2","time":"18:08:12.5","vertex_angle":"215.0"},{"altitude":"43.7","azimuth":"227.7","day":"8","phenomenon":"Totality Begins","position_angle":"356.2","time":"19:21:36.8","vertex_angle":"324.0"},{"altitude":"43.6","azimuth":"227.9","day":"8","phenomenon":"Maximum Eclipse","time":"19:22:35.4"},{"altitude":"43.4","azimuth":"228.2","day":"8","phenomenon":"Totality Ends","position_angle":"291.8","time":"19:23:35.5","vertex_angle":"259.3"},{"altitude":"32.9","azimuth":"245.9","day":"8","phenomenon":"Eclipse Ends","position_angle":"56.9","time":"20:33:33.4","vertex_angle":"15.6"}],"magnitude":"1.004","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=44.15314,-77.38890&height=94
    "     Belleville-Zwicks     ": {"apiversion":"4.0.1","geometry":{"coordinates":[-77.3889,44.15314],"height":"94m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 25m 22.9s","duration_of_totality":"2m 06.3s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"51.4","azimuth":"203.0","day":"8","phenomenon":"Eclipse Begins","position_angle":"231.3","time":"18:08:09.8","vertex_angle":"215.1"},{"altitude":"43.7","azimuth":"227.6","day":"8","phenomenon":"Totality Begins","position_angle":"358.6","time":"19:21:31.3","vertex_angle":"326.4"},{"altitude":"43.6","azimuth":"227.9","day":"8","phenomenon":"Maximum Eclipse","time":"19:22:33.7"},{"altitude":"43.5","azimuth":"228.2","day":"8","phenomenon":"Totality Ends","position_angle":"289.4","time":"19:23:37.6","vertex_angle":"256.9"},{"altitude":"32.9","azimuth":"245.9","day":"8","phenomenon":"Eclipse Ends","position_angle":"56.8","time":"20:33:32.7","vertex_angle":"15.5"}],"magnitude":"1.005","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

};

let selected = Object.keys(dataCache)[0];
let selectedIndex = 0;

let layout = new Layout( {
    type:'v', c: [
        {type:'txt', font:'9%', id:'selected', label:'     nowhereselectedyet     '},
        {type:'txt', font:'9%', id:'time', label:'HH:MM:SS'},
        {type:'txt', font:'12%',label:'   '},
        {type:'txt', font:'35%', id:'interval', label:'23.9h'},
        {type:'txt', font:'12%', label:'until'},
        {type:'txt', font:'12%', id:'event', label:'NEXT ECLIPSE EVENT'}
    ]
}, {lazy: true});
g.clear();
layout.render();
let previousInterval = '';

Bangle.setUI({mode: 'custom', btn: () => {
    if (Bangle.isBacklightOn()) {
      selectedIndex++;
      if (selectedIndex == Object.keys(dataCache).length) {
        selectedIndex = 0;
      }
      selected = Object.keys(dataCache)[selectedIndex];
    }
}});

function timeRefresh() {

    // update time display
    const now = new Date(Date.now());

    layout.selected.label = selected;
  
    layout.time.label = now.as('0h:0m:0s').str;

    // update next event display
    let interval = 0;
    let nextEvent = '';
    if (now.getTime() > dataCache[selected].eclipseEnd) {
        interval = 'done';
        nextEvent = '2106';
    } else if (now.getTime() > dataCache[selected].totalityEnd) {
        interval = dataCache[selected].eclipseEnd - now.getTime();
        nextEvent = 'eclipse end';
    } else if (now.getTime() > dataCache[selected].totalityStart) {
        interval = dataCache[selected].totalityEnd - now.getTime();
        nextEvent = 'totality end';
    } else if (now.getTime() > dataCache[selected].eclipseStart) {
        interval = dataCache[selected].totalityStart - now.getTime();
        nextEvent = 'totality start';
    } else {
        interval = dataCache[selected].eclipseStart - now.getTime();
        nextEvent = 'eclipse start';
    }

    let buzz = 0;

    interval /= 1000;
    
    if (interval > 86400) {
        interval = Math.floor(interval / 86400) + 'd';
    } else if (interval > (3600 * 2)) { // two hours or more
        interval = Math.floor(interval / 360) / 10 + 'h'; // include one decimal
    } else if (interval > (60 * 5)) { // five minutes or more
        interval = Math.floor(interval / 60) + 'm';
    } else if (interval >= 0) {
        interval = Math.floor(interval);
        if (interval == 0) {
          buzz = 1000;
        } else if (interval <= 15) {
          buzz = 100;
        }
        interval += "s";
    }

    if ((interval != previousInterval) && buzz) {
        Bangle.buzz(buzz);
        Bangle.setLCDPower(1);
    }

    layout.interval.label = interval;
    layout.event.label = nextEvent;
    layout.render();
    previousInterval = interval;

}

function start() {

    // add easier fields to work with to the dataCache
    Object.keys(dataCache).forEach((key) => {
        dataCache[key].locationDetails = 
            dataCache[key].geometry.coordinates[0] + ', ' +
            dataCache[key].geometry.coordinates[1] + ', ' +
            dataCache[key].geometry.height;

        let datePrefix = '2024-04-08T';

        dataCache[key].eclipseStart =
            new Date(datePrefix + dataCache[key].properties.local_data[0].time + 'Z').getTime();

        dataCache[key].totalityStart =
            new Date(datePrefix + dataCache[key].properties.local_data[1].time + 'Z').getTime();

        dataCache[key].peak =
            new Date(datePrefix + dataCache[key].properties.local_data[2].time + 'Z').getTime();

        dataCache[key].totalityEnd =
            new Date(datePrefix + dataCache[key].properties.local_data[3].time + 'Z').getTime();

        dataCache[key].eclipseEnd =
            new Date(datePrefix + dataCache[key].properties.local_data[4].time + 'Z').getTime();
      
    });

    setInterval(timeRefresh, 100);

}

start();
