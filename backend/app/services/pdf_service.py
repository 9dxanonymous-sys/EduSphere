from io import BytesIO

from reportlab.lib.units import inch
from reportlab.pdfgen import canvas


def generate_transcript_pdf(transcript):

    buffer = BytesIO()

    pdf = canvas.Canvas(buffer)

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(180, 800, "EduSphere Transcript")

    pdf.setFont("Helvetica", 12)

    pdf.drawString(50, 760, f"Student: {transcript['student_name']}")
    pdf.drawString(50, 740, f"Student ID: {transcript['student_id']}")
    pdf.drawString(50, 720, f"GPA: {transcript['gpa']}")

    y = 680

    pdf.setFont("Helvetica-Bold", 12)

    pdf.drawString(50, y, "Course")
    pdf.drawString(220, y, "Code")
    pdf.drawString(300, y, "CH")
    pdf.drawString(350, y, "Marks")
    pdf.drawString(430, y, "Grade")

    pdf.setFont("Helvetica", 12)

    y -= 25

    for course in transcript["courses"]:

        pdf.drawString(50, y, course["course"])
        pdf.drawString(220, y, course["course_code"])
        pdf.drawString(300, y, str(course["credit_hours"]))
        pdf.drawString(350, y, str(course["marks"]))
        pdf.drawString(430, y, course["grade"])

        y -= 25

        if y < 80:
            pdf.showPage()
            y = 760

    pdf.save()

    buffer.seek(0)

    return buffer