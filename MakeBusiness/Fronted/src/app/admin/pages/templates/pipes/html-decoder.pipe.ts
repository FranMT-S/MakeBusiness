import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'


@Pipe({
  name: 'htmlDecoder'
})
export class HtmlDecoderPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) { }

  transform(value: string) {
    value = value.substring(13, value.length-1);
    var doc = new DOMParser().parseFromString(value, "text/html");
    const value123 = doc.documentElement.textContent as string;
    return this.sanitized.bypassSecurityTrustHtml(value123);
  }

}
