import { Topbar } from './topbar/Topbar'
import { MainPanel } from './mainPanel/MainPanel'
import { NavigationBar } from './navigationBar/NavigationBar'

// import de estilos
import styles from './Player.module.css'
import AudioPlayer from 'features/player/audio/AudioPlayer'

export const Player = () => {
    return (
        <main className={styles.root}>
            <div className={styles.topbar}><Topbar /></div>
            <div className={styles.player} >
                <div className={styles.player__navbar} >
                    <NavigationBar />
                </div>
                <div className={styles.player__content}>
                    <MainPanel />
                </div>
            </div>
            <div className={styles.audio}><AudioPlayer /></div>
        </main>
    )
}