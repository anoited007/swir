import {Jumbotron, Container} from 'react-bootstrap'
import styles from '../styles/jumbotron.module.css'
const CustomJumbotron = (props) => {
    return(
        <Jumbotron>
            <Container className={styles.jumbotronBg}>
               <div className={styles["jumbotronBg"]}>
                  <h1 className={"text-center"}> SWEIR Assignment</h1>
                   <h4 className={"text-center"}>{props.content}</h4>
               </div>
            </Container>
        </Jumbotron>
    );
}

export default CustomJumbotron;