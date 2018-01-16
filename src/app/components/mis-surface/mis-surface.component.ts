import {
  AfterContentInit, Compiler, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, Input,
  ModuleWithComponentFactories,
  NgModule,
  OnChanges, OnInit,
  Renderer2, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {JsonLoaderService} from '../../services/json-loader.service';
import {TemplateCreatorService} from '../../services/template-creator.service';
import {IDomNode} from '../../models/IDomNode';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-mis-surface',
  templateUrl: './mis-surface.component.html',
  styleUrls: ['./mis-surface.component.css']
})
export class MisSurfaceComponent implements OnChanges {


  @Input() pathToNode: string;
  @ViewChild('container', {read: ViewContainerRef})
  container: ViewContainerRef;

  @ViewChild('surface') surface:ElementRef;

  private colorButtons = [
    {name: 'red', color: 'red'},
    {name: 'green', color: 'green'},
    {name: 'blue', color: 'blue'}
  ];


  private componentRef: ComponentRef<{}>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler,
              private jsonLoader: JsonLoaderService,
              private templateFactory: TemplateCreatorService,
              private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('pathToNode')) {
      let currentValue: string = changes['pathToNode'].currentValue;
      if (currentValue != undefined) {
        this.jsonLoader.loadJson(currentValue).subscribe((domNode) => {
          this.createComponent(domNode);
        });
      }
    }
  }

  setColor(color) {
    if (this.componentRef) {
      this.renderer.setStyle(
        this.componentRef.location.nativeElement.firstChild,
        'background-color',
        color
      );
    }
  }

  private createComponent(domNode: IDomNode) {
    let metadata = {
      selector: `mis-node-item`,
      template: this.templateFactory.createTemplate(domNode),
      styleUrls: ['./mis-node-item.component.scss']
    };
    let factory = this.createComponentFactorySync(this.compiler, metadata, null);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);
    this.addMoveEventsToComponents(this.componentRef);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const cmpClass = componentClass || class RuntimeComponent {
      name: string = 'Denys';
    };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({imports: [CommonModule], declarations: [decoratedCmp]})
    class RuntimeComponentModule {
    }

    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

  private addMoveEventsToComponents(ref: ComponentRef<{}>) {
    let isMove = false;
    let startEvent;
    let currentPosition = {x: 0, y: 0};
    let oldPosition:any = {};

    this.renderer.listen(ref.location.nativeElement, 'mousedown', ($event) => {
      isMove = true;
      startEvent = $event;
      Object.assign(oldPosition,currentPosition);
    });
    this.renderer.listen(this.surface.nativeElement, 'mousemove', ($event) => {
      if (isMove !== true) return;
      currentPosition.x = oldPosition.x + $event.x - startEvent.x;
      currentPosition.y = oldPosition.y + $event.y - startEvent.y;
      this.renderer.setStyle(ref.location.nativeElement.firstChild, 'transform',
        `translate(${currentPosition.x}px, ${currentPosition.y}px)`);
    });

    this.renderer.listen(this.surface.nativeElement, 'mouseup', () => {
      isMove = false;
    });
  }


}
