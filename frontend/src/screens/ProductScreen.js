import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {Col,Row,Button,Image,Card,ListGroup, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'

const ProductScreen = () => {
    const [qty,setQty]=useState(1);
    const {id}=useParams();
    const dispatch = useDispatch()

    const productDetails=useSelector((state)=>state.productDetails)
    const {product,loading,error}=productDetails

    useEffect(()=>{
        dispatch(detailsProduct(id))
    },[id,dispatch]);
    
    const navigate=useNavigate()
    const addToCartHandler=()=>{
        navigate(`/cart/${id}/?qty=${qty}`)
    }
    return (
        <>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(<Row>
                <Col md={6}>
                    <Image src={product.image} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews` }/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <Row>
                            <Col>
                            Price: 
                        </Col>
                        <Col>
                        <strong>${product.price}</strong>
                        
                        </Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Qty
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x =>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>)
                        }
                        <ListGroup.Item>
                            <Button className="w-100" 
                                type="button" 
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}>
                                    Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col>
            </Row>)}
            
        </>
    )
}

export default ProductScreen