import { CardBody, CardContainer, CardItem } from "../../components/ui/CardThreeDimensionalEffect";

const BiographySection = () => {
    return (
        <>
            <CardContainer className="inter-var" containerClassName={"biography-container"}>
                <CardBody className={"biography-box"}>
                    <CardItem translateZ="100" className="w-full mt-4">
                        <div className="biography-content">
                            <h2>Un parcours hors des sentiers battus.</h2>
                            <p className="biography-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque amet dolorum in aliquid odio tempora assumenda? Ea quo accusamus eum ex labore quidem nostrum asperiores? Iste fugit laudantium eligendi itaque.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque amet dolorum in aliquid odio tempora assumenda? Ea quo accusamus eum ex labore quidem nostrum asperiores? Iste fugit laudantium eligendi itaque.
                                <br /> <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque amet dolorum in aliquid odio tempora assumenda? Ea quo accusamus eum ex labore quidem nostrum asperiores? Iste fugit laudantium eligendi itaque.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque amet dolorum in aliquid odio tempora assumenda? Ea quo accusamus eum ex labore quidem nostrum asperiores? Iste fugit laudantium eligendi itaque.
                                <br /> <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque amet dolorum in aliquid odio tempora assumenda? Ea quo accusamus eum ex labore quidem nostrum asperiores? Iste fugit laudantium eligendi itaque.
                            </p>
                        </div>
                    </CardItem>
                    <CardItem rotateY="-15" translateZ="60" className="w-full mt-4">
                        <div className="rounded-xl group-hover/card:shadow-xl biography-image"></div>
                    </CardItem>
                </CardBody>
                <CardItem translateZ="100" className="mt-4">
                    <a href="#" className="read-more-button">Contactez moi</a>
                </CardItem>
            </CardContainer>
        </>
    )
}

export default BiographySection;