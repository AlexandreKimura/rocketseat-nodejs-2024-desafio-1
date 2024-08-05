import { parse } from 'csv-parse';
import * as fs from 'node:fs';

import { IReponseReadCsv, IStreamCsvGateway } from "./interfaces/istream-csv.gateway";

export class StreamCsvGateway implements IStreamCsvGateway {

  async read(filepath: string): Promise<IReponseReadCsv[]> {
    const stream = fs.createReadStream(filepath);
    const csvParse = parse({
      delimiter: ',',
      skipEmptyLines: true,
      fromLine: 2
    });

    const lines = stream.pipe(csvParse);

    const infos = []
    for await (const line of lines) {
      const [title, description] = line;
      infos.push({ title, description })
    }

    return infos
  }
}
