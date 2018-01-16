import { Injectable } from '@angular/core';
import {IDomNode} from '../models/IDomNode';

@Injectable()
export class TemplateCreatorService {

  constructor() { }

  public createTemplate(domNode: IDomNode) :string{
    let tagAttributes:string = this.createAttribute(domNode.attributes);
    let tagContent:string = '';
    if (domNode.content && domNode.content.length > 0) {
      tagContent = domNode.content.map((contentNode) => this.createTemplate(contentNode)).join('\n')
    }
    tagContent += domNode.text || '';
    let openTag:string = domNode.tag ? `<${domNode.tag} ${tagAttributes}>` : ``;
    let closeTag:string = domNode.tag ? `</${domNode.tag}>` : ``;
    return `${openTag} 
                ${tagContent}
            ${closeTag} `
  }


  private createAttribute(entries:{[key: string]: string}):string {
    return entries ? Object.getOwnPropertyNames(entries).map((key:string) => `${key} = "${entries[key]}"`).join(' ') : '';
  }
}
