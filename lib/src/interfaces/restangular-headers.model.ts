import { HttpHeaders } from '@angular/common/http';

export type RestangularHeaders = HttpHeaders | string | { [name: string]: string | string[] };
