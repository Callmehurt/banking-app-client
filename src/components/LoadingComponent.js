import logo from '../images/logo.png'

const LoadingComponent = () => {
    return (
        <div id="preloader-active">
            <div className="pageloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="preloader-circle" style={{display: 'grid', placeItems: 'center'}}>
                    </div>
                    <div className="preloader-img pere-text" style={{borderRadius: '50%', overflow: 'hidden', height: '50px', width: '50px'}}>
                        <img src={logo} alt="logo" height='45' className="rounded-circle" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoadingComponent;
