import { NgModule } from '@angular/core';
import { DayPipe } from './pipiday.pipe';

import { SearchPipe } from './search.pipe';

@NgModule({
    imports: [],
    exports: [SearchPipe,DayPipe],
    declarations: [SearchPipe,DayPipe],
    providers: [],
})
export class PipeModule { }
