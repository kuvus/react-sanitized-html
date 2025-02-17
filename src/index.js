import PropTypes from 'prop-types'
import React from 'react'
import sanitizeHTML from 'sanitize-html'

const SUPPORTED_SANITIZER_OPTIONS = [
    'allowProtocolRelative',
    'allowedAttributes',
    'allowedClasses',
    'allowedSchemes',
    'allowedSchemesByTag',
    'allowedTags',
    'exclusiveFilter',
    'nonTextTags',
    'parser',
    'selfClosing',
    'transformTags',
]

const SanitizedHTML = props => {
    const sanitizerOptions = SUPPORTED_SANITIZER_OPTIONS.reduce((options, name) => {
        const value = props[name]

        if (typeof value !== 'undefined') {
            options[name] = value
        }

        return options
    }, {})

    // TODO: Add memoization
    let sanitizedHTML = sanitizeHTML(props.html, sanitizerOptions)

    // Replace multiple spaces with a single space
    sanitizedHTML = sanitizedHTML.replace(/ +(?= )/g, '')

    // Slice and add ellipsis
    sanitizedHTML =
        props.finalLength && sanitizedHTML.length > props.finalLength
            ? sanitizedHTML.slice(0, props.finalLength) + (props.ellipsis ? '...' : '')
            : sanitizedHTML

    return (
        <div
            className={props.className}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            id={props.id}
            style={props.style}
        />
    )
}

SanitizedHTML.defaultProps = {
    html: '',
}

SanitizedHTML.propTypes = {
    allowProtocolRelative: PropTypes.bool,
    allowedAttributes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    allowedClasses: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    allowedSchemes: PropTypes.arrayOf(PropTypes.string),
    allowedSchemesByTag: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    allowedTags: PropTypes.arrayOf(PropTypes.string),
    exclusiveFilter: PropTypes.func,
    html: PropTypes.string.isRequired,
    nonTextTags: PropTypes.arrayOf(PropTypes.string),
    parser: PropTypes.any,
    selfClosing: PropTypes.arrayOf(PropTypes.string),
    transformTags: PropTypes.objectOf(PropTypes.oneOf([PropTypes.func, PropTypes.string])),

    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.any,

    finalLength: PropTypes.number,
    ellipsis: PropTypes.bool,
}

export default SanitizedHTML
