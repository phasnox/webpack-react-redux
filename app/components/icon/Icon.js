import React, {PropTypes} from 'react'
import classNames from 'classnames'

import styles from './_Icon.scss'

export const Icon = ({title, className}) => {
  const iconClassNames = className.split(' ').map((cn) =>
    styles[`fa-${cn}`]
  )

  return <i className={classNames(styles.fa, iconClassNames)} title={title} />
}

Icon.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string.isRequired
}
