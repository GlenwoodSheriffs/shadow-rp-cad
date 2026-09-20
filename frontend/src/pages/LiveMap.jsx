import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, Rectangle, Tooltip } from 'react-leaflet';
import { api, socketUrl } from '../api.js';
import StatusBadge from '../components/StatusBadge.jsx';
import { BRAND } from '../brand.js';

const bounds = [[0,0],[10000,10000]];
const unitIcon = L.divIcon({ className:'map-unit-icon', html:'<span></span>', iconSize:[22,22], iconAnchor:[11,11] });
const callIcon = L.divIcon({ className:'map-call-icon', html:'!', iconSize:[26,26], iconAnchor:[13,13] });
const districts = [
  { name:'North Hills', bounds:[[6900,500],[9700,3800]], color:'#2d7f9d' },
  { name:'Downtown', bounds:[[3900,3400],[6900,6700]], color:'#7450b8' },
  { name:'East Glenwood', bounds:[[4300,6900],[7900,9700]], color:'#377d68' },
  { name:'Southside', bounds:[[500,2800],[3600,6800]], color:'#975269' },
  { name:'Harbor District', bounds:[[500,7000],[3900,9700]], color:'#376da6' },
  { name:'Industrial Park', bounds:[[7000,4100],[9700,6800]], color:'#8b6c3d' }
];

export default function LiveMap(){
  const [data,setData]=useState({calls:[],units:[]});
  useEffect(()=>{api('/cad/dashboard').then(setData)},[]);
  useEffect(()=>{const ws=new WebSocket(socketUrl());ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.type.startsWith('call.'))setData(d=>({...d,calls:[m.data,...d.calls.filter(x=>x.id!==m.data.id)].filter(x=>x.status!=='CLOSED')}));if(m.type==='unit.updated')setData(d=>({...d,units:[m.data,...d.units.filter(x=>x.reforger_uid!==m.data.reforger_uid)]}))};return()=>ws.close()},[]);
  return <div><div className="page-heading"><div><p className="eyebrow">GLENWOOD COMMON OPERATING PICTURE</p><h1>Glenwood live unit map</h1><p>Citywide unit telemetry, active calls, and six public-safety response districts across {BRAND.city}.</p></div><div className="map-legend"><span><i className="unit-dot"/>Unit</span><span><i className="call-dot"/>Call</span></div></div>
    <section className="map-frame"><MapContainer crs={L.CRS.Simple} bounds={bounds} maxBounds={bounds} minZoom={-3} maxZoom={2} zoomControl attributionControl={false}>
      <Rectangle bounds={bounds} pathOptions={{color:'#476257',fillColor:'#101d18',fillOpacity:1,weight:2}}/>
      {Array.from({length:9},(_,i)=><Rectangle key={i} bounds={[[i*1000,0],[(i+1)*1000,10000]]} pathOptions={{color:'#274137',fillOpacity:0,weight:.4}}/>)}
      {districts.map(district=><Rectangle key={district.name} bounds={district.bounds} pathOptions={{color:district.color,fillColor:district.color,fillOpacity:.08,weight:1}}><Tooltip permanent direction="center" className="district-label">{district.name}</Tooltip></Rectangle>)}
      {data.units.filter(u=>u.world_x!=null&&u.world_z!=null).map(u=><Marker icon={unitIcon} position={[u.world_z,u.world_x]} key={u.reforger_uid}><Tooltip permanent direction="right">{u.callsign}</Tooltip><Popup><strong>{u.callsign}</strong><br/>{u.player_name}<br/><StatusBadge value={u.duty_status}/></Popup></Marker>)}
      {data.calls.filter(c=>c.world_x!=null&&c.world_z!=null).map(c=><Marker icon={callIcon} position={[c.world_z,c.world_x]} key={c.id}><Tooltip direction="top">#{c.id} {c.call_title}</Tooltip><Popup><strong>{c.call_title}</strong><br/>{c.location_grid}<br/>{c.description}</Popup></Marker>)}
    </MapContainer></section>
  </div>;
}
