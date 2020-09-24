import React from 'react'
import styles from './MunaDocs.css'

class MunaDocs extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Muna resources</h2>
        </header>
        <div className={styles.content}>
          <p><a href='https://docs.muna.xyz/docs/model/introduction' target='_blank'>Muna documentation</a></p>
        </div>
      </div>
    )
  }
}

export default {
  name: 'muna-docs-widget',
  component: MunaDocs
}
