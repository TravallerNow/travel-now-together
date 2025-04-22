
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, MessageSquare } from "lucide-react";

const DoctorDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No appointments for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              My Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No patients assigned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No new messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
