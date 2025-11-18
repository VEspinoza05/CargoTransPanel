export interface IPackageModel {
  id: number;
  sender: string;
  recipient: string;
  destination: string;
  weight: number;
  dimensions: string;
  contentType: string;
  observations: string;
  status: string;
  receptionDate: Date;
  latitudeDestination: number;
  longitudeDestination: number;
}