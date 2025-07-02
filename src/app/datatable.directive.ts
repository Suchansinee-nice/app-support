import { Directive, Input, EventEmitter, Output, SimpleChanges, ElementRef, Renderer2, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ChangeDetectorRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

interface ColumnSort {
    name: string;
    type: string;
}

@Directive({
    selector: '[datatable]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatatableDirective),
            multi: true
        }
    ],
    standalone: false
})
export class DatatableDirective implements ControlValueAccessor {
    @Input() id!: string
    private data: any[] = [];
    private recordPerPage = 10

    private divPages!: HTMLDivElement

    private readonly PAGE_NEXT = ">"
    private readonly PAGE_PREVIOUS = "<"
    private currentPage = 1

    @Output() dataChange = new EventEmitter<string>();

    private onChange: (value: any) => void = () => { };
    private onTouched: () => void = () => { };

    writeValue(value: any): void {
        this.data = value;
        if (this.data) {
            this.insertPaginator()
            this.gotoPage(1)
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor(private el: ElementRef, private renderer: Renderer2
    ) { }

    ngOnInit() {
        if (!this.id) {
          throw Error("Directive [datatable] attribure id is required")
        }
      }

    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes['data']) {
    //         console.log('data changed:', changes['data'].currentValue);
    //     }
    // }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        const target = event.target as HTMLElement;
        if (target.tagName === 'TH' && target.hasAttribute("sorting")) {
            const sorting = target.getAttribute("sorting")
            if (sorting) {
                const column = JSON.parse(sorting)
                this.sorting(column)
            }
        }
    }

    private insertPaginator() {
        const id = this.id + "TblPaginator"

        //ลบของเดิม
        const oldDiv = this.el.nativeElement.parentNode.querySelector('#'+id) as HTMLDivElement;
        if (oldDiv) {
            oldDiv.remove()
        }

        const div = this.renderer.createElement('div') as HTMLDivElement;
        div.classList.add("row", "mt-2")
        div.id = id

        //Page result
        div.appendChild(this.createDivPageResult())

        //Paginator
        this.divPages = div.appendChild(this.createPaginator())

        this.renderer.insertBefore(
            this.el.nativeElement.parentNode,
            div,
            this.el.nativeElement.nextSibling
        );


    }

    private createDivPageResult() {
        //Div
        const div = this.renderer.createElement('div') as HTMLDivElement;
        div.classList.add("col-sm-6")

        //Result found record
        const txt = this.renderer.createElement("span") as HTMLSpanElement
        txt.textContent = "found " + this.data?.length + " record(s)"

        div.appendChild(txt)

        return div
    }

    //สร้างปุ่มกดตามหน้า
    private createPaginator() {
        let div = this.renderer.createElement('div') as HTMLDivElement;
        div.classList.add("col-sm-6", "d-flex", "justify-content-end", "gap-1")

        const { data, recordPerPage } = this

        const totalPage = Math.ceil(data.length / recordPerPage)

        for (var i = 0; i < totalPage; i++) {
            if (i == 0) {
                const buttonFirst = this.createPageButton(this.PAGE_PREVIOUS)
                div.appendChild(buttonFirst)
            }

            if (i == totalPage - 1) {
                const divMore = this.renderer.createElement('div') as HTMLDivElement;
                const more = this.renderer.createElement('span') as HTMLSpanElement

                more.textContent = "..."
                divMore.style.padding = "10px"
                divMore.style.display = "none"
                divMore.classList.add("more-last")
                divMore.appendChild(more)
                div.appendChild(divMore)
            }

            const page = (i + 1).toString()
            const button = this.createPageButton(page)
            if (i == 0 || i == totalPage - 1) {
                button.style.display = "block"
            }
            button.classList.add("paging")
            div.appendChild(button)

            if (i == 0) {
                const divMore = this.renderer.createElement('div') as HTMLDivElement;
                const more = this.renderer.createElement('span') as HTMLSpanElement

                more.textContent = "..."
                divMore.style.padding = "10px"
                divMore.style.display = "none"
                divMore.classList.add("more-first")
                divMore.appendChild(more)
                div.appendChild(divMore)
            }
            if (i == totalPage - 1) {
                const buttonLast = this.createPageButton(this.PAGE_NEXT)
                div.appendChild(buttonLast)
            }

        }

        return div
    }

    private createPageButton(content: string) {
        const button = this.renderer.createElement('button') as HTMLButtonElement;
        button.type = "button"
        button.classList.add("btn", "btn-page")
        button.textContent = content
        button.value = content
        button.style.display = "none"

        const t$ = this

        button.addEventListener('click', function () {
            if (content === t$.PAGE_NEXT) {
                t$.gotoPage(++t$.currentPage)
            } else if (content === t$.PAGE_PREVIOUS) {
                t$.gotoPage(--t$.currentPage)
            } else {
                t$.gotoPage(+this.value)
            }
        });


        return button;
    }

    private gotoPage(page: number) {
        const pageIndex = page - 1;
        const { data, recordPerPage, divPages } = this
        this.currentPage = page

        //Hilight
        Array.from(divPages.children).map(child => child as HTMLButtonElement).forEach(child => {
            child.classList.remove('active');
            if (child.textContent === (page).toString()) {
                child.classList.add("active")
            }
        });

        let rowData = []

        for (var i = pageIndex * recordPerPage; i < data.length && i < (pageIndex + 1) * recordPerPage; i++) {
            rowData.push(data[i])
        }
        this.onChange(rowData)

        this.displayPaginator(page)
    }

    displayPaginator(page: number) {

        const { data, recordPerPage, divPages } = this

        const totalPage = Math.ceil(data.length / recordPerPage)
        const buttonPage = Array.from(divPages.children)
            .map(child => child as HTMLButtonElement).filter(child => child.classList.contains('paging'));
        const buttonPrevious = Array.from(divPages.children)
            .map(child => child as HTMLButtonElement).filter(child => child.value == this.PAGE_PREVIOUS);
        const buttonNext = Array.from(divPages.children)
            .map(child => child as HTMLButtonElement).filter(child => child.value == this.PAGE_NEXT);

        const divMoreFirst = Array.from(divPages.children)
            .map(child => child as HTMLDivElement).filter(child => child.classList.contains('more-first'));
        const divMoreLast = Array.from(divPages.children)
            .map(child => child as HTMLDivElement).filter(child => child.classList.contains('more-last'));

        const pageIndex = page - 1

        /*Begin Default display none*/
        Array.from(buttonPage).forEach(button => {
            if (button.value != "1" && button.value != totalPage.toString())
                button.style.display = "none"
        });
        /*End Default display none*/

        buttonPrevious[0].style.setProperty("display", page > 1 ? "block" : "none")
        buttonNext[0].style.setProperty("display", page < totalPage ? "block" : "none")

        let buttonPageShow = []
        let divMoreFirstShow = false;
        let divMoreLastShow = false;

        if (totalPage > 10) {
            let count = 5;
            if (page >= count && totalPage - page >= count - 1) {
                divMoreFirstShow = true;
                divMoreLastShow = true
                buttonPageShow.push(pageIndex - 1)
                buttonPageShow.push(pageIndex)
                buttonPageShow.push(pageIndex + 1)
            } else {
                if (page <= count) {
                    let p = 0;
                    while (count > 0) {
                        buttonPageShow.push(p++)
                        count--;
                    }
                    divMoreLastShow = true
                } else {
                    while (count >= 0) {
                        buttonPageShow.push(totalPage - count)
                        count--;
                    }
                    divMoreFirstShow = true
                }
            }

            divMoreFirst[0].style.setProperty("display", divMoreFirstShow ? "block" : "none")
            divMoreLast[0].style.setProperty("display", divMoreLastShow ? "block" : "none")
            buttonPageShow.forEach(index => {
                buttonPage[index]?.style.setProperty("display", "block")
            })

        } else {
            let count = 0;
            while (count < totalPage) {
                buttonPage[count++]?.style.setProperty("display", "block")
            }
        }
    }

    sorting(column: ColumnSort) {
        if (column) {
            let sortType = this.checkSorting(column);
            this.data.sort((a: any, b: any) => {
                let aCol = a[column.name];
                let bCol = b[column.name];
                if (column.type === "date") {
                    const date1 = this.convertToDate(aCol);
                    const date2 = this.convertToDate(bCol);
                    if (sortType == "asc") {
                        return date1.getTime() - date2.getTime();
                    } else {
                        return date2.getTime() - date1.getTime();
                    }
                } else {
                    if (sortType == "asc") {
                        return aCol.localeCompare(bCol);
                    } else {
                        return bCol.localeCompare(aCol);
                    }
                }
            });
        }

        this.gotoPage(1)

    }

    private convertToDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    private checkSorting(column: any = {}): string {
        let { data } = this;
        let dataType = column.type;
        let isAsc = true;
        let isDesc = true;

        let key = column.name;

        for (let i = 0; i < data.length - 1; i++) {
            if (dataType == "date") {
                let d1 = this.convertToDate(data[i][key])
                let d2 = this.convertToDate(data[i + 1][key])

                if (d1.getTime() > d2.getTime()) {
                    isAsc = false;
                }
                if (d1.getTime() < d2.getTime()) {
                    isDesc = false;
                }

            } else {
                if (data[i][key] > data[i + 1][key]) {
                    isAsc = false;
                }
                if (data[i][key] < data[i + 1][key]) {
                    isDesc = false;
                }
            }
        }

        if (isAsc) {
            return 'desc';
        } else if (isDesc) {
            return 'asc';
        } else {
            return 'asc';
        }
    }

}
