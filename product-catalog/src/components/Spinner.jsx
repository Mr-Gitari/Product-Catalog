function spinner() {
    return (
        <div style={{textAlign: 'center' , padding: '2rem'}}>
            <div style={{width: '40px' , height: '40px' , border: '4px solid #ccc' , borderTop: '4px , solid #333' , borderRadius: '50%', animate: 'spin 0.8s , linear, infinite' , margin: '0 auto'}} />
            </div>
    )
}

export default spinner