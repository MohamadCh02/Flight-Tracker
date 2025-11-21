export default class Flight {
  constructor(
    callsign,
    OriginCountry,
    DestinationCountry,
    category,
    coordinates,
  ) {
    this.callsign = callsign;
    this.OriginCountry = OriginCountry;
    this.DestinationCountry = DestinationCountry;
    this.category = category;
    this.coordinates = coordinates;
  }
}
