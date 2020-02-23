import * as React from 'react';
import './App.css';
import JqxKanban, { IKanbanProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxkanban';
class DVKanban extends React.PureComponent<{}&any, IKanbanProps&any> {
    private theme = jqx.theme;
    private myKanban = React.createRef<JqxKanban>();
    private itemIndex: number = 0;

    constructor(props: {}) {
        super(props);
        this.onItemAttrClicked = this.onItemAttrClicked.bind(this);
        this.onColumnAttrClicked = this.onColumnAttrClicked.bind(this);
        const fields: any[] = [
            { name: 'id', type: 'string' },
            { name: 'status', map: 'state', type: 'string' },
            { name: 'text', map: 'label', type: 'string' },
            { name: 'tags', type: 'string' },
            { name: 'color', map: 'hex', type: 'string' },
            { name: 'resourceId', type: 'number' }
        ];
        const source = {
            dataFields: fields,
            dataType: 'array',
            localData: [
                { id: '1161', state: 'new', label: 'Combine Orders', tags: 'orders, combine', hex: '#5dc3f0', resourceId: 3 },
                { id: '1645', state: 'work', label: 'Change Billing Address', tags: 'billing', hex: '#f19b60', resourceId: 1 },
                { id: '9213', state: 'new', label: 'One item added to the cart', tags: 'cart', hex: '#5dc3f0', resourceId: 3 },
                { id: '6546', state: 'done', label: 'Edit Item Price', tags: 'price, edit', hex: '#5dc3f0', resourceId: 4 },
                { id: '9034', state: 'new', label: 'Login 404 issue', tags: 'issue, login', hex: '#6bbd49' }
            ]
        };
        const resourcesAdapterFunc = (): any => {
            const resourcesSource = {
                dataFields: [
                    { name: 'id', type: 'number' },
                    { name: 'name', type: 'string' },
                    { name: 'image', type: 'string' },
                    { name: 'common', type: 'boolean' }
                ],
                dataType: 'array',
                localData: [
                    { id: 0, name: 'No name', image: './../images/andrew.png', common: true },
                    { id: 1, name: 'Andrew Fuller', image: './../images/andrew.png' },
                    { id: 2, name: 'Janet Leverling', image: './../images/janet.png' },
                    { id: 3, name: 'Steven Buchanan', image: './../images/steven.png' },
                    { id: 4, name: 'Nancy Davolio', image: './../images/nancy.png' },
                    { id: 5, name: 'Michael Buchanan', image: './../images/Michael.png' },
                    { id: 6, name: 'Margaret Buchanan', image: './../images/margaret.png' },
                    { id: 7, name: 'Robert Buchanan', image: './../images/robert.png' },
                    { id: 8, name: 'Laura Buchanan', image: './../images/Laura.png' },
                    { id: 9, name: 'Laura Buchanan', image: './../images/Anne.png' }
                ]
            };
            const resourcesDataAdapter = new jqx.dataAdapter(resourcesSource);
            return resourcesDataAdapter;
        };
        const getIconClassName = (): string => {
            switch (this.theme) {
                case 'darkblue':
                case 'black':
                case 'shinyblack':
                case 'ui-le-frog':
                case 'metrodark':
                case 'orange':
                case 'darkblue':
                case 'highcontrast':
                case 'ui-sunny':
                case 'ui-darkness':
                    return 'jqx-icon-plus-alt-white ';
            }
            return 'jqx-icon-plus-alt';
        };
        const columnRenderer = (element: any, collapsedElement: any, column: any): void => {
            if (element[0]) {
                const elementHeaderStatus = element[0].getElementsByClassName('jqx-kanban-column-header-status')[0];
                const collapsedElementHeaderStatus = collapsedElement[0].getElementsByClassName('jqx-kanban-column-header-status')[0];
                // setTimeout(() => {
                //     const columnItems = this.myKanban.current!.getColumnItems(column.dataField).length;
                //     elementHeaderStatus.innerHTML = ' (' + columnItems + '/' + column.maxItems + ')';
                //     collapsedElementHeaderStatus.innerHTML = ' (' + columnItems + '/' + column.maxItems + ')';
                // }, 500);
            }
        };
        const template: string =
            '<div class="jqx-kanban-item" id="">'
            + '<div class="jqx-kanban-item-color-status"></div>'
            + '<div style="display: none;" class="jqx-kanban-item-avatar"></div>'
            + '<div class="jqx-icon jqx-icon-close jqx-kanban-item-template-content jqx-kanban-template-icon"></div>'
            + '<div class="jqx-kanban-item-text"></div>'
            + '<div style="display: none;" class="jqx-kanban-item-footer"></div>'
            + '</div>';
        const itemRenderer = (element: any, item: any, resource: any): void => {
            element[0].getElementsByClassName('jqx-kanban-item-color-status')[0].innerHTML = '<span style="line-height: 23px; margin-left: 5px;">' + resource.name + '</span>';
            element[0].getElementsByClassName('jqx-kanban-item-text')[0].style.background = item.color;
        };
        this.state = {
            columnRenderer,
            columns: [
                { text: 'Backlog', iconClassName: getIconClassName(), dataField: 'new', maxItems: 4 },
                { text: 'In Progress', iconClassName: getIconClassName(), dataField: 'work', maxItems: 2 },
                { text: 'Done', iconClassName: getIconClassName(), dataField: 'done', maxItems: 5 }
            ],
            itemRenderer,
            resources: resourcesAdapterFunc(),
            source: new jqx.dataAdapter(source),
            template
        }
    }
    public render() {
        return (
            <div id = "abbss">
            <JqxKanban ref={this.myKanban} 
                onItemAttrClicked={this.onItemAttrClicked} onColumnAttrClicked={this.onColumnAttrClicked}
                width={'100%'} template={this.state.template} source={this.state.source} columns={this.state.columns}
                resources={this.state.resources} columnRenderer={this.state.columnRenderer} height={550}
                itemRenderer={this.state.itemRenderer} />
            </div>
        );
    }
    private onItemAttrClicked(event: any): void {
        const args = event.args;
        if (args.attribute === 'template') {
            this.myKanban.current!.removeItem(args.item.id);
        }
    };
    private onColumnAttrClicked(event: any): void {
        const args = event.args;
        if (args.attribute === 'button') {
            args.cancelToggle = true;
            if (!args.column.collapsed) {
                const colors = ['#f19b60', '#5dc3f0', '#6bbd49', '#dddddd'];
                this.myKanban.current!.addItem({
                    color: colors[Math.floor(Math.random() * 4)],
                    resourceId: Math.floor(Math.random() * 4),
                    status: args.column.dataField,
                    tags: 'new task',
                    text: '<input placeholder="(No Title)" style="width: 96%; margin-top:2px; border-radius: 3px;' +
                        'border-color: #ddd; line-height:20px; height: 20px;" class="jqx-input" id="newItem' + this.itemIndex + '" value= "" />'
                });
                const id = `newItem${this.itemIndex}`;
                const myInput = document.getElementById(id);
                if (myInput !== null && myInput !== undefined) {
                    myInput.addEventListener('mousedown', (eventEl: any): void => {
                        eventEl.stopPropagation();
                    });
                    myInput.addEventListener('mouseup', (eventEl: any): void => {
                        eventEl.stopPropagation();
                    });
                    myInput.addEventListener('keydown', (eventEl: any): void => {
                        if (eventEl.keyCode === 13) {
                            const valueElement = `<span>${eventEl.target.value}</span>`;
                            eventEl.target.insertAdjacentHTML('beforebegin', valueElement);
                            eventEl.target.remove();
                        }
                    });
                    myInput.focus();
                }
                this.itemIndex++;
            }
        }
    };
}
export default DVKanban;