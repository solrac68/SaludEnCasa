export interface IDomicilio{
  id: number
  destinatario: string
  dateInicio: number
  dateEntrega: number
  dateRetorno: number
  estado: Boolean
  terminado: Boolean
  distance?: number
  posicion: marker
  markers: marker[]
}

export interface marker {
	lat: number;
  lng: number;
  distance?: number
  label: string
}
