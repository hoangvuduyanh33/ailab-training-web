import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/app/hooks";
import { userApi } from "src/services";
import { userSelector } from "src/store/user";
import { InternalLink } from "../common/InternalLink";
import PageLayout from "../common/PageLayout";
import { timestampToDate } from "../utils/time";
import AddMenteeModal from "./AddMenteeModal";
import AdminMenteeTable from "./AdminMenteeTable";
import MentorMenteeTable from "./MentorMenteeTable";

const colWidth = ["20%", "20%", "15%", "15%", "15%", "20%"];

const Mentors = () => {
  const [mentees, setMentees] = useState([]);
  const [loadingMentees, setLoading] = useState(false);
  const [numSubmit, setNumSubmit] = useState(0);
  const { role } = useAppSelector(userSelector);
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    setLoading(true);
    try {
      userApi.getMentee({
      }).then((data: any) => {
        console.log("data = ", data);
        setMentees(data);
      });
    } catch (e) {
      console.log("e = ", e);
    } finally {
      setLoading(false);
    }
  }, []);
  const increaseSubmit = () => {
    setNumSubmit(numSubmit + 1);
  }
  if (loadingMentees) {
    return <></>;
  }
  return (
    <PageLayout>
      {(role == "admin") && <AdminMenteeTable />}
      {(role == "mentor") && <MentorMenteeTable />}
    </PageLayout>
  );
};

export default Mentors;
