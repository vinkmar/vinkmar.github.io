const DEMO = false;

// api documentation: https://aa.usno.navy.mil/data/api
const dataCache = {

    // from https://aa.usno.navy.mil/api/eclipses/solar/date?date=2024-04-08&coords=44.22568,-76.48151&height=74
    "Kingston-BatteryPark": {"apiversion":"4.0.1","geometry":{"coordinates":[-76.48151,44.22568],"height":"74m","type":"Point"},"properties":{"day":8,"delta_t":"72.8s","description":"Sun in Total Eclipse at this Location","duration":"2h 24m 54.9s","duration_of_totality":"3m 05.8s","event":"Solar Eclipse of 2024 April 08","local_data":[{"altitude":"51.0","azimuth":"204.8","day":"8","phenomenon":"Eclipse Begins","position_angle":"231.9","time":"18:09:28.8","vertex_angle":"214.4"},{"altitude":"43.1","azimuth":"228.8","day":"8","phenomenon":"Totality Begins","position_angle":"21.3","time":"19:22:09.9","vertex_angle":"348.5"},{"altitude":"42.9","azimuth":"229.3","day":"8","phenomenon":"Maximum Eclipse","time":"19:23:42.0"},{"altitude":"42.7","azimuth":"229.7","day":"8","phenomenon":"Totality Ends","position_angle":"267.1","time":"19:25:15.7","vertex_angle":"233.8"},{"altitude":"32.2","azimuth":"246.8","day":"8","phenomenon":"Eclipse Ends","position_angle":"56.7","time":"20:34:23.7","vertex_angle":"15.1"}],"magnitude":"1.012","month":4,"obscuration":"100.0%","year":2024},"type":"Feature"},

};

let selected = Object.keys(dataCache)[0];

require('DateExt');

const Layout = require('Layout');
let layout = new Layout( {
    type:'v', c: [
        {type:'txt', font:'12%', id:'time', label:'HH:MM:SS'},
        {type:'txt', font:'12%',label:'   '},
        {type:'txt', font:'35%', id:'interval', label:'23.9h'},
        {type:'txt', font:'12%', label:'until'},
        {type:'txt', font:'12%', id:'event', label:'NEXT ECLIPSE EVENT'}
    ]
}, {lazy: true});
g.clear();
layout.render();
let previousInterval = '';

function timeRefresh() {

    // update time display
    const now = new Date(Date.now());

    if (DEMO) {
        // pretend it's eclipse day today
        now.setFullYear(2024, 3, 8);
    }

    //layout.clear(layout.time);
    layout.time.label = now.as('0h:0m:0s').str;
    //layout.render(layout.time);

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

    if (interval > 0) {
        interval /= 1000;
    }

    if (interval > 86400) {
        interval = Math.floor(interval / 86400) + 'd';
    } else if (interval > (3600 * 2)) { // two hours or more
        interval = Math.floor(interval / 360) / 10 + 'h'; // include one decimal
    } else if (interval > (60 * 5)) { // five minutes or more
        interval = Math.floor(interval / 60) + 'm';
    } else if (interval > 0) {
        interval = Math.floor(interval) + "s";
    }

    if (interval == '5s' || interval == '4s' || interval == '3s' || interval == '2s' || interval == '1s') {
        if (previousInterval != interval) {
            Bangle.buzz(100);
            Bangle.setLCDPower(1);
        }
    } else if (interval == '0s') {
      if (previousInterval != interval) {
        Bangle.buzz(1000);
        Bangle.setLCDPower(1);
      }
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

        dataCache[key].eclipseStart =
            new Date('2024-04-08T' + dataCache[key].properties.local_data[0].time + 'Z').getTime();

        dataCache[key].totalityStart =
            new Date('2024-04-08T' + dataCache[key].properties.local_data[1].time + 'Z').getTime();

        dataCache[key].peak =
            new Date('2024-04-08T' + dataCache[key].properties.local_data[2].time + 'Z').getTime();

        dataCache[key].totalityEnd =
            new Date('2024-04-08T' + dataCache[key].properties.local_data[3].time + 'Z').getTime();

        dataCache[key].eclipseEnd =
            new Date('2024-04-08T' + dataCache[key].properties.local_data[4].time + 'Z').getTime();

    });

    setInterval(timeRefresh, 100);

}

start();
