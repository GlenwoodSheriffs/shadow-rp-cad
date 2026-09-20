export const BRAND = Object.freeze({
  network: 'Shadow RP',
  city: 'Glenwood Shadow City',
  shortCity: 'Glenwood',
  publicSafety: 'Glenwood Department of Public Safety',
  dispatchCenter: 'Glenwood Metro Operations Center',
  residentNetwork: 'Glenwood Resident Network',
  bank: 'Glenwood Shadow Bank',
  exchange: 'Glenwood Exchange',
  mapSizeMeters: 10000,
  logoPath: 'shadow-rp-logo.gif'
});

export function logoUrl() {
  return `${import.meta.env.BASE_URL}${BRAND.logoPath}`;
}
