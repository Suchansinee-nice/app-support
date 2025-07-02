import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrl: './datatable.component.scss',
    standalone: false
})
export class DatatableComponent {
  pages = [{code:10,name:"10"}, {code:50,name:"50"}, {code:100,name:"100"}];

  @Input() data: any;
  tempData: any = [];
  records: number = 10;
  pageCount: number = 0;
  selectedPage: number = 0;

  @Output() paging = new EventEmitter<string>();

  constructor(private cdRef: ChangeDetectorRef) {}

  change(data: any) {
    this.data = data
    if (this.data) {
      this.tempData = JSON.parse(JSON.stringify(this.data))
      this.recordPerPage(this.pages[0].code)
    }
    this.cdRef.detectChanges();
  }

  sorting(column: string | null) {
    if (column) {
      let temp = JSON.parse(column)
      let sortType = this.checkSorting(temp);
      this.tempData.sort((a: any, b: any) => {
        let aCol = a[temp.name];
        let bCol = b[temp.name];
        if (temp.type == "date") {
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

    this.data = this.tempData
    this.recordPerPage(this.records)
    
  }

  recordPerPage(n: number) {
    this.records = n
    let data:any = []
    let {tempData} = this;

    for (var i = 0; i < tempData.length && i < n; i++) {
      data.push(tempData[i])
    }

    this.pageCount = Math.ceil(tempData.length / n)
    this.selected(0);
    this.paging.emit(data);
  }

  selected(n: number) {
    this.selectedPage = n
    let data:any = []
    let {tempData, records} = this;

    for (var i = n*records; i < tempData.length && i < (n+1)*records; i++) {
      data.push(tempData[i])
    }

    this.paging.emit(data);
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
        let d2 = this.convertToDate(data[i+1][key])

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

  ngOnDestroy() {
    if (this.paging) {
      this.paging.unsubscribe();
    }
  }

}
