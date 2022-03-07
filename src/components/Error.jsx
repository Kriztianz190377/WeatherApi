import PropTypes from 'prop-types'


const Error = ({message}) => {
    return (
        <div>
             <h5 className="red darken-4 error "> {message} </h5> 

            
        </div>
    )
}
Error.propTypes = {
    message: PropTypes.string.isRequired
}
export default Error
