'use strict';

var ControlForm = React.createClass({
    displayName: 'ControlForm',
    getInitialState: function getInitialState() {
        return {
            image: this.props.initialImage,
            rows: this.props.initialRows,
            columns: this.props.initialColumns,
            curviness: this.props.initialCurviness,
            barHeight: this.props.initialBarHeight
        };
    },
    updateRows: function updateRows(event) {
        this.setState({
            rows: event.target.value
        });

        this.bars.setRows(event.target.value);
    },
    updateColumns: function updateColumns(event) {
        this.setState({
            columns: event.target.value
        });

        this.bars.setColumns(event.target.value);
    },
    updateCurviness: function updateCurviness(event) {
        this.setState({
            curviness: event.target.value
        });

        this.bars.setCurviness(event.target.value);
    },
    updateBarHeight: function updateBarHeight(event) {
        this.setState({
            barHeight: event.target.value
        });

        this.bars.setBarHeight(event.target.value);
    },
    render: function render() {
        return React.createElement(
            'form',
            { className: 'form-horizontal' },
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-2 control-label', htmlFor: 'rows' },
                    'Rows'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control', id: 'rows', type: 'range', min: '1', max: '100', value: this.state.rows, onChange: this.updateRows })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-2' },
                    React.createElement(
                        'p',
                        { className: 'form-control-static' },
                        this.state.rows
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-2 control-label', htmlFor: 'columns' },
                    'Columns'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control', id: 'columns', type: 'range', min: '1', max: '100', value: this.state.columns, onChange: this.updateColumns })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-2' },
                    React.createElement(
                        'p',
                        { className: 'form-control-static' },
                        this.state.columns
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-2 control-label', htmlFor: 'curviness' },
                    'Curviness'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control', id: 'curviness', type: 'range', min: '0', max: '1', step: '0.1', value: this.state.curviness, onChange: this.updateCurviness })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-2' },
                    React.createElement(
                        'p',
                        { className: 'form-control-static' },
                        this.state.curviness
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'col-sm-2 control-label', htmlFor: 'barHeight' },
                    'Bar height'
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    React.createElement('input', { className: 'form-control', id: 'barHeight', type: 'range', min: '0', max: '1', step: '0.1', value: this.state.barHeight, onChange: this.updateBarHeight })
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-2' },
                    React.createElement(
                        'p',
                        { className: 'form-control-static' },
                        this.state.barHeight
                    )
                )
            )
        );
    },
    componentDidMount: function componentDidMount() {
        this.bars = new BarPortrait('canvas', this.state.image, this.state.rows, this.state.columns, this.state.curviness, this.state.barHeight);
    }
});

ReactDOM.render(React.createElement(ControlForm, { initialImage: './cube.png', initialRows: '20', initialColumns: '20', initialCurviness: '0.5', initialBarHeight: '0.8' }), document.getElementById('control-form'));