import React from 'react'
import { Accordion, Box, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
import { Passage } from '@/data/words'

const PassageAccordion = ({passages}:{passages: Passage[]}) => {
    return (
        <Accordion allowToggle>

            {
                passages.map((passage, key) => (
                    <AccordionItem key={key}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    {passage.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {passage.passage}
                        </AccordionPanel>
                    </AccordionItem>
                ))
            }
        </Accordion>)
}

export default PassageAccordion