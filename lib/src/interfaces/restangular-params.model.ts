import { HttpParams } from '@angular/common/http';

export type RestangularParams = HttpParams | string | { [name: string]: string | string[] };
