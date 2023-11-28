
import {
  Box
} from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import ListRoutes from "../../ListRoutes";




function Sidebar() {

  const variantChange = "0.2s linear";

  const sidebarBg = 'rgb(255, 255, 255)';
  const sidebarRadius = "20px";
  const sidebarMargins = "0px";


  return (
    <Box>
      <Box display={{ base: "none", lg: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          h="100vh"
          ps="2rem"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
          boxShadow={'0.3em 0.3em 0.9em rgba(0, 0, 0, 0.1);'}
        >
          <SidebarContent routes={ListRoutes}
          />
        </Box>
      </Box>
    </Box>
  );
}




export default Sidebar;
