import {
    CardBody,
    CardContainer,
    CardItem,
} from '../../components/ui/CardThreeDimensionalEffect';

const BiographySection = () => {
    return (
        <>
            <div id="biography-container" className="biography-container">
                <div className="biography-box">
                    <div className="biography-content">
                        <h2>Un parcours hors des sentiers battus.</h2>
                        <p className="biography-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eaque amet dolorum in aliquid odio tempora
                            assumenda? Ea quo accusamus eum ex labore quidem
                            nostrum asperiores? Iste fugit laudantium eligendi
                            itaque. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Eaque amet dolorum in aliquid odio
                            tempora assumenda? Ea quo accusamus eum ex labore
                            quidem nostrum asperiores? Iste fugit laudantium
                            eligendi itaque.
                            <br /> <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eaque amet dolorum in aliquid odio tempora
                            assumenda? Ea quo accusamus eum ex labore quidem
                            nostrum asperiores? Iste fugit laudantium eligendi
                            itaque. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Eaque amet dolorum in aliquid odio
                            tempora assumenda? Ea quo accusamus eum ex labore
                            quidem nostrum asperiores? Iste fugit laudantium
                            eligendi itaque.
                            <br /> <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eaque amet dolorum in aliquid odio tempora
                            assumenda? Ea quo accusamus eum ex labore quidem
                            nostrum asperiores? Iste fugit laudantium eligendi
                            itaque.
                        </p>
                    </div>
                    <CardContainer
                        containerClassName={'biography-image-container'}
                    >
                        <CardBody className={'w-full h-full'}>
                            <CardItem translateZ="30" className="w-full h-full">
                                <div className="rounded-xl group-hover/card:shadow-xl biography-image"></div>
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
        </>
    );
};

export default BiographySection;
