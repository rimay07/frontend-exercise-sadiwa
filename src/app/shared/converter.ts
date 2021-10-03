import {Injectable} from '@angular/core';

@Injectable()
export class Converter {

    constructor() {
    }

    public transformApiValues(value) {
        if ((value.toLowerCase()).indexOf('mandatory') > -1) {
            return 'mandatory';
        } else {
            if ((value.toLowerCase()).indexOf('"') > -1) {
                const tempValue = value.replace(/["“”,]/g, '');
                let newArr = tempValue.split(/\r?\n/);
                const toLower = (val) => {
                    return val.toLowerCase();
                };
                newArr = newArr.map(toLower);
                return newArr;
            } else {
                return 'optional';
            }
        }
    }

    public tableToExcel(tableArr) {
        let sheets = '';
        const uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
            'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
            , worksheetEnd = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
            '<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>' +
            '</head><body><table>{table1}</table></body></html>'
            , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        }
            , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        };

        const ctx = {};
        tableArr.forEach((table, i) => {
            if (!table.nodeType) {
                table = document.getElementById(table);
            }
            // console.log(table, tableArr);
            ctx['worksheet' + i] = tableArr[i].toString() || 'Worksheet_' + i;
            ctx['table' + i] = table.innerHTML;
            sheets += '<x:ExcelWorksheet><x:Name>{worksheet' + i + '}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
                '</x:WorksheetOptions></x:ExcelWorksheet>';
        });
        // console.log(ctx, sheets, template + sheets + worksheetEnd);

        window.location.href = uri + base64(format(template + sheets + worksheetEnd, ctx));
    }
}
