import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ArgusGridProvider } from '../../provider/argus.grid.provider';

@Component({
    selector: 'expansion-panel-formatter-comp',
    templateUrl: './tpl/index.html',
    styleUrls: [
        'styles/index.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ArgusExpansionPanelFormatterComponent {
    private panelOpenState: boolean;
    private params: any;
    private gridProvider: ArgusGridProvider;
    @ViewChild('expansivePanel') private expansivePanel: any;

    constructor(private injector: Injector) {}

    // called on init
    agInit(params: any): void {
        console.log(params);
        this.params = params;
        this.gridProvider = this.injector.get(ArgusGridProvider);
    }

    toggleExpansionPanel(toggle: boolean) {
        let self = this;
        this.panelOpenState = toggle;
        let heightHeader = parseInt($(self.expansivePanel.nativeElement)
                            .find('.mat-expansion-panel-header').height().toString(), 0);
        if (heightHeader === 48) {
            let heightContent = $(self.expansivePanel.nativeElement)
                                .find('.mat-expansion-panel-body').height();
            let height = heightContent + heightHeader + 20 + 16;
            this.gridProvider.gridOptions.api.forEachNode(rowNode => {
                if (rowNode.rowIndex === self.params.rowIndex) {
                    rowNode.setRowHeight(height);
                }
            });
        } else {
            this.gridProvider.gridOptions.api.forEachNode(rowNode => {
                if (rowNode.rowIndex === self.params.rowIndex) {
                    rowNode.setRowHeight(48);
                }
            });
        }
        this.gridProvider.gridOptions.api.onRowHeightChanged();
    }

    refresh(params: any) {
        console.log(params);
    }
}
