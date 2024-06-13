import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'scoreFormat'
})
export class ScoreFormatPipe implements PipeTransform {

    transform(value: number): string {
        if (Number.isInteger(value)) {
            return value.toString();
        } else {
            return value.toFixed(2);
        }
    }

}
