import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Filter.css'
function Filter() {
  return (
    <div id="filter-container"  style={{margin: "auto", padding: "20px 0 10px 0"}}>
       <Form style={{width: '90%',margin: 'auto' , padding:"0px 0px 10px 0px" }} className="d-flex">
        <FormControl
          type="search"
          placeholder="Search by artist"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-primary">Search</Button>
      </Form>
      <div style={{width: '90%',textAlign: "center", margin: "auto"}}>
      <div style={{fontWeight: 'bolder', textAlign: "center", color: "#0D6EFD"}}>Filter options</div>
      <Form>
        <div style={{ fontWeight: 'bold', textAlign: "left"}}> Release year range </div>
        <Form.Group style={{padding:"10px 0px 10px 0px", justifyContent:"space-evenly"}}className="d-flex">
            <Form.Label>Start year: </Form.Label>
            <Form.Select style={{width: '25%'}} aria-label="Default select example">
                <option>2020</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            <Form.Label >End year: </Form.Label>
            <Form.Select style={{width: '25%' }} aria-label="Default select example">
                <option>2020</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </Form.Group>
        <div style={{ fontWeight: 'bold', textAlign: "left"}}> Songs attributes </div>
        <Form.Group style={{width: '90%'}}>
            <Form.Label> Danceability</Form.Label>
            <Form.Range/>
        </Form.Group>
        <Form.Group style={{width: '90%'}}>
            <Form.Label> Energy</Form.Label>
            <Form.Range />
        </Form.Group>
        <Form.Group style={{width: '90%'}}>
            <Form.Label> Liveliness</Form.Label>
             <Form.Range/>
        </Form.Group>
        <Form.Group style={{width: '90%'}}>
            <Form.Label> Tempo</Form.Label>
            <Form.Range/>
        </Form.Group>
        </Form>
      </div>
        
    </div>
  );
}

export default Filter;
