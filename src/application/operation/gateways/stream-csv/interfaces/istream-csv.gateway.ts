
export interface IReponseReadCsv {
  title: string
  description: string
}

export interface IStreamCsvGateway {
  read(filepath: string): Promise<IReponseReadCsv[]>;
}

export const IStreamCsvGateway = Symbol('IStreamCsvGateway');
