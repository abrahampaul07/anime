import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, Input, Image } from 'semantic-ui-react'
export default function Posts() {
    const [APIData, setAPIData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const fetchData = () => {
        fetch("https://api.jikan.moe/v3/search/anime?q=naruto&limit=16")
        .then((response)=> {
          return response.json();
        }).then((data)=> {
          // console.log(data);
          let result = data.results
          setAPIData(result);
        })
      }
    useEffect(() => {
        fetchData();
    }, [])

    const searchData = (value) => {
        setSearchTerm(value)
        if (searchTerm !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchTerm.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchData(e.target.value)}
            />
            <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
                {searchTerm.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                <Image src={item.image_url} wrapped ui={false} />
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Description>
                                        {item.email}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <Card>
                                <Image src={item.image_url} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Description>
                                        {item.email}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                )}
            </Card.Group>
        </div>
    )
}