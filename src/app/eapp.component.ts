import { ElementRef, Renderer2 } from "@angular/core";
import { DatatableComponent } from "./_component/datatable/datatable.component";

export class EappComponent {

    initDatatable(data: any[], datatable: DatatableComponent, table: ElementRef, renderer: Renderer2) {
        if (table) {
            datatable.change(data)
            const headers = table.nativeElement.querySelectorAll('th');
            headers.forEach((header: HTMLElement, index: number) => {
                if (header.hasAttribute('sorting')) {
                    renderer.listen(header, 'click', () => {
                        const sortingValue = header.getAttribute('sorting');
                        datatable.sorting(sortingValue)
                    });
                }
            });
        }
    }

    // private bindSorting(datatable: DatatableComponent, table: ElementRef, renderer: Renderer2) {
    //     if (table) {
    //         const headers = table.nativeElement.querySelectorAll('th');
    //         headers.forEach((header: HTMLElement, index: number) => {
    //             if (header.hasAttribute('sorting')) {
    //                 renderer.listen(header, 'click', () => {
    //                     const sortingValue = header.getAttribute('sorting');
    //                     datatable.sorting(sortingValue)
    //                 });
    //             }
    //         });
    //     }
    // }

}