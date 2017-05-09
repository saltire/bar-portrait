const ControlForm = React.createClass({
    getInitialState() {
        return {
            image: this.props.initialImage,
            rows: this.props.initialRows,
            columns: this.props.initialColumns,
            curviness: this.props.initialCurviness,
            barHeight: this.props.initialBarHeight
        };
    },

    updateRows(event) {
        this.setState({
            rows: event.target.value
        });

        this.bars.setRows(event.target.value);
    },

    updateColumns(event) {
        this.setState({
            columns: event.target.value
        });

        this.bars.setColumns(event.target.value);
    },

    updateCurviness(event) {
        this.setState({
            curviness: event.target.value
        });

        this.bars.setCurviness(event.target.value);
    },

    updateBarHeight(event) {
        this.setState({
            barHeight: event.target.value
        });

        this.bars.setBarHeight(event.target.value);
    },

    getImageFile(event) {
        event.preventDefault();
        this.fileInput.click();
    },

    updateImageFile(event) {
        if (event.target.files && event.target.files.length) {
            this.setState({
                imageFile: event.target.files[0]
            });

            this.bars.setImageFromFile(event.target.files[0]);
        }
    },

    render() {
        return (
            <form className='form-horizontal'>
                <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='rows'>Rows</label>
                    <div className='col-sm-8'>
                        <input className='form-control' id='rows' type='range' min='1' max='100' value={this.state.rows} onChange={this.updateRows} />
                    </div>
                    <div className='col-sm-2'>
                        <p className='form-control-static'>{this.state.rows}</p>
                    </div>
                </div>
                <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='columns'>Columns</label>
                    <div className='col-sm-8'>
                        <input className='form-control' id='columns' type='range' min='1' max='100' value={this.state.columns} onChange={this.updateColumns} />
                    </div>
                    <div className='col-sm-2'>
                        <p className='form-control-static'>{this.state.columns}</p>
                    </div>
                </div>
                <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='curviness'>Curviness</label>
                    <div className='col-sm-8'>
                        <input className='form-control' id='curviness' type='range' min='0' max='1' step='0.1' value={this.state.curviness} onChange={this.updateCurviness} />
                    </div>
                    <div className='col-sm-2'>
                        <p className='form-control-static'>{this.state.curviness}</p>
                    </div>
                </div>
                <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='barHeight'>Bar height</label>
                    <div className='col-sm-8'>
                        <input className='form-control' id='barHeight' type='range' min='0' max='1' step='0.1' value={this.state.barHeight} onChange={this.updateBarHeight} />
                    </div>
                    <div className='col-sm-2'>
                        <p className='form-control-static'>{this.state.barHeight}</p>
                    </div>
                </div>
                <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='imageFile'>Image file</label>
                    <div className='col-sm-1'>
                        <input type='file' ref={input => { this.fileInput = input; }} accept='image/*' onChange={this.updateImageFile} />
                        <button className='btn btn-default' onClick={this.getImageFile}>Browse</button>
                    </div>
                    <div className='col-sm-7'>
                        <p className='form-control-static'>{this.state.imageFile && this.state.imageFile.name}</p>
                    </div>
                </div>
            </form>
        );
    },

    componentDidMount() {
        this.bars = new BarPortrait('image', 'canvas', 500, this.state.image, this.state.rows, this.state.columns, this.state.curviness, this.state.barHeight);
    }
});

ReactDOM.render(
    <ControlForm initialImage='./cube.png' initialRows='20' initialColumns='20' initialCurviness='0.5' initialBarHeight='0.8' />,
    document.getElementById('control-form'));
