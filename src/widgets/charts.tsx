import Card from "../components/Card";
import ReactSwipe from 'react-swipe'

export default function Charts(){
  return <Card>
    <ReactSwipe className="carousel">
      <div>2</div>
      <div>3</div>
    </ReactSwipe>
  </Card>
}