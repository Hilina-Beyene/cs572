import { Pipe, PipeTransform, Input  } from '@angular/core';

@Pipe({
  name: 'multi'
})

export class MultiPipes implements PipeTransform{
    
    transform(value : string, source: string): string { 
        let append = '';
        let parseSource = parseInt(source);
        for(let i=0; i<parseSource; i++){
            append += ' ' + value;
        }

        return append;
    } 
}